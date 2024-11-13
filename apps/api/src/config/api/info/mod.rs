use actix_web::{body::BoxBody, HttpRequest, HttpResponse, Responder};
use serde::Deserialize;
use serde::Serialize;
use std::env;

use crate::util::res::convert_to_json_body;


#[derive(Clone, Serialize, Deserialize)]
pub struct ServiceInfo {
    application_name: String,
    application_version: String,
    commit_hash: String,
    xsi_signature: String,
}

impl ServiceInfo {
    /// This function creates a new instance of the ServiceInfo struct, using the values found in .env file
    /// located in the root of the project. If the env vars are not found the value of the corresponding
    /// field is set to "Unknown".
    pub fn new() -> Self {
        dotenv::dotenv().ok();
        let missing_env_var_text = String::from("Unknown");
        Self {
            application_name: env::var("X_APPLICATION_NAME")
                .unwrap_or(missing_env_var_text.clone()),
            application_version: env::var("X_APPLICATION_VERSION")
                .unwrap_or(missing_env_var_text.clone()),
            commit_hash: env::var("X_APPLICATION_COMMIT_HASH")
                .unwrap_or(missing_env_var_text.clone()),
            xsi_signature: env::var("X_APPLICATION_XSI_SIGNATURE")
                .unwrap_or(missing_env_var_text.clone()),
        }
    }
}

impl Responder for ServiceInfo {
    type Body = BoxBody;

    /// Returns a HTTP response containing the service info as json.
    fn respond_to(self, _req: &HttpRequest) -> HttpResponse<Self::Body> {
        convert_to_json_body(&self)
    }
}
