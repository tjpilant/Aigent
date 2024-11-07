import logging

def get_logger(name: str) -> logging.Logger:
    """
    Creates and returns a logger instance with the specified name.
    
    Args:
        name (str): The name for the logger, typically __name__ from the calling module
        
    Returns:
        logging.Logger: Configured logger instance
    """
    logger = logging.getLogger(name)
    
    if not logger.handlers:
        handler = logging.StreamHandler()
        formatter = logging.Formatter(
            '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
        )
        handler.setFormatter(formatter)
        logger.addHandler(handler)
        logger.setLevel(logging.INFO)
    
    return logger
