use debugrs::RsDebugger;

pub fn get_logger(label: &str) -> RsDebugger {
    RsDebugger::new(format!("arc:rs:server:{}", label))
}
