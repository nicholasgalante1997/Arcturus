pub mod fsutils {
    use std::fs;
    use std::io;
    use std::path::Path;

    pub fn load_directory_contents(path: &str) -> io::Result<Vec<String>> {
        let mut contents = Vec::new();

        for entry in fs::read_dir(path)? {
            let entry = entry?;
            let path = entry.path();
            if path.is_file() {
                if let Some(file_name) = path.file_name() {
                    if let Some(file_name_str) = file_name.to_str() {
                        contents.push(file_name_str.to_string());
                    }
                }
            }
        }

        Ok(contents)
    }
}
