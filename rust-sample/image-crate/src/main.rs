use image::imageops::FilterType;
use jpeg_encoder::ColorType;
use jpeg_encoder::Encoder as JpegEncoder;

fn main() {
    let img = image::open("input.png").unwrap();
    let resize_img = img.resize(200, 200, FilterType::Lanczos3);
    let gray_img = resize_img.grayscale();
    let blur_img = gray_img.blur(5.0);
    let encoder = JpegEncoder::new_file("output.jpg", 80).unwrap();
    encoder
        .encode(
            &blur_img.to_rgb8(),
            blur_img.width() as u16,
            blur_img.height() as u16,
            ColorType::Rgb,
        )
        .unwrap();
}
