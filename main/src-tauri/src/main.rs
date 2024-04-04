// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use native_dialog::FileDialog;
use std::process::Command;

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
        .invoke_handler(tauri::generate_handler![greet, ls, open_dialog])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
