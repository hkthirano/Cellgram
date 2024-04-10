mod utils;

use rustface::Detector;
use std::cell::RefCell;
use wasm_bindgen::prelude::*;

const MODEL: &[u8] = include_bytes!("../model.bin");

thread_local! {
    static DETECTOR: RefCell<Option<Box<dyn Detector>>> = RefCell::new(None);
}

#[wasm_bindgen]
pub fn setup() {
    let model = rustface::read_model(MODEL).expect("failed to read model.");
    let mut detector = rustface::create_detector_with_model(model);
    detector.set_min_face_size(20);
    detector.set_score_thresh(2.8);
    detector.set_pyramid_scale_factor(0.5);
    detector.set_slide_window_step(4, 4);
    DETECTOR.set(Some(detector));
}

#[wasm_bindgen]
pub struct Info {
    x: i32,
    y: i32,
    mosaic: Vec<Row>,
}

#[wasm_bindgen]
impl Info {
    #[wasm_bindgen(getter)]
    pub fn x(&self) -> i32 {
        self.x
    }
    #[wasm_bindgen(getter)]
    pub fn y(&self) -> i32 {
        self.y
    }
    #[wasm_bindgen(getter)]
    pub fn mosaic(self) -> Vec<Row> {
        self.mosaic
    }
}

trait Average {
    type Output;
    fn average(self, rhs: Self::Output) -> Self::Output;
}

#[wasm_bindgen]
pub struct Row {
    cols: Vec<Rgb>,
}

#[wasm_bindgen]
impl Row {
    #[wasm_bindgen(getter)]
    pub fn cols(self) -> Vec<Rgb> {
        self.cols
    }
}

impl Average for Row {
    type Output = Self;
    fn average(self, rhs: Self::Output) -> Self::Output {
        let cols = self
            .cols()
            .into_iter()
            .zip(rhs.cols())
            .map(|(acc, e)| acc.average(e))
            .collect();
        Row { cols }
    }
}

#[wasm_bindgen]
pub struct Rgb {
    r: u8,
    g: u8,
    b: u8,
}

impl Rgb {
    fn new(rgba: &[u8]) -> Self {
        Self {
            r: rgba[0],
            g: rgba[1],
            b: rgba[2],
        }
    }
}

#[wasm_bindgen]
impl Rgb {
    #[wasm_bindgen(getter)]
    pub fn r(&self) -> u8 {
        self.r
    }
    #[wasm_bindgen(getter)]
    pub fn g(&self) -> u8 {
        self.g
    }
    #[wasm_bindgen(getter)]
    pub fn b(&self) -> u8 {
        self.b
    }
}

impl Average for Rgb {
    type Output = Self;
    fn average(self, rhs: Self::Output) -> Self::Output {
        Rgb {
            r: ((self.r() as u16 + rhs.r() as u16) >> 1) as u8,
            g: ((self.g() as u16 + rhs.g() as u16) >> 1) as u8,
            b: ((self.b() as u16 + rhs.b() as u16) >> 1) as u8,
        }
    }
}

#[wasm_bindgen]
pub fn detect(rgba: &[u8], img_width: u32, img_height: u32, block_size: usize) -> Vec<Info> {
    let grayscale = rgba
        .chunks(4)
        .map(|v| ((19 * v[0] as u16) >> 8) + ((183 * v[1] as u16) >> 8) + ((53 * v[2] as u16) >> 8))
        .map(|v| v as u8)
        .collect::<Vec<_>>();

    let img = rustface::ImageData::new(&grayscale, img_width, img_height);

    DETECTOR.with(|detector| {
        let Some(ref mut detector) = *detector.borrow_mut() else {
            return vec![];
        };
        detector
            .detect(&img)
            .iter()
            .map(|info| {
                let x = info.bbox().x();
                let y = info.bbox().y();
                let mosaic = mosaic(
                    rgba,
                    img_width,
                    x,
                    y,
                    info.bbox().width(),
                    info.bbox().height(),
                    block_size,
                );
                Info { x, y, mosaic }
            })
            .collect()
    })
}

fn mosaic(
    rgba: &[u8],
    img_width: u32,
    x: i32,
    y: i32,
    face_width: u32,
    face_height: u32,
    block_size: usize,
) -> Vec<Row> {
    rgba.chunks(4 * img_width as usize)
        .skip(y as usize)
        .take(face_height as usize)
        .collect::<Vec<_>>()
        .chunks_exact(block_size)
        .filter_map(|rows| {
            rows.iter()
                .filter_map(|row| {
                    let left = 4 * x as usize;
                    let cols = row
                        .get(left..left + 4 * face_width as usize)?
                        .chunks_exact(4 * block_size)
                        .filter_map(|pixels| {
                            pixels
                                .chunks(4)
                                .map(Rgb::new)
                                .reduce(|acc, e| acc.average(e))
                        })
                        .collect();
                    Some(Row { cols })
                })
                .reduce(|acc, e| acc.average(e))
        })
        .collect()
}
