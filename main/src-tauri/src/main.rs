// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use image::{self, GenericImageView, Rgba};
use native_dialog::FileDialog;
use std::{path::PathBuf, process::Command, result};

#[tauri::command]
fn open_img() -> (usize, usize, Vec<u8>) {
    let result = FileDialog::new()
        .set_location("~")
        .show_open_single_file()
        .unwrap();

    match result {
        Some(path) => return _open_img(path),
        None => return (0, 0, vec![]),
    };
}

fn _open_img(path: PathBuf) -> (usize, usize, Vec<u8>) {
    let img = image::open(path).expect("Dimage");

    let width = img.width() as usize;
    let height = img.height() as usize;
    let img_src = img.into_rgba8();
    (width, height, img_src.to_vec())
}

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}

#[tauri::command]
fn ls() -> String {
    let output = if cfg!(target_os = "windows") {
        Command::new("cmd")
            .args(["/C", "echo hello"])
            .output()
            .expect("failed to execute process")
    } else {
        Command::new("sh")
            .arg("-c")
            .arg("echo hello")
            .output()
            .expect("failed to execute process")
    };

    let hello = output.stdout;
    let s = String::from_utf8(hello).unwrap();
    return s;
}

#[tauri::command]
fn open_dialog() {
    let result = FileDialog::new().set_location("~").show_open_single_file();
    println!("{:?}", result);
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, ls, open_dialog, open_img])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
