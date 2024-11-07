from pydantic import BaseModel
import logging

logger = logging.getLogger(__name__)

class BaseTool(BaseModel):
    """
    The base class for all tools in the Agency Swarm framework.
    All custom tools should inherit from this class.
    """
    
    def run(self):
        """
        The main method to execute the tool's functionality.
        This method should be overridden in all subclasses.
        """
        logger.error("Each tool must implement the 'run' method.")
        raise NotImplementedError("Each tool must implement the 'run' method.")
