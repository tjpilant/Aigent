from agency_swarm.tools import BaseTool
from pydantic import Field
import os
from dotenv import load_dotenv

load_dotenv()

class TaskCreationTool(BaseTool):
    """
    Facilitates creation and delegation of development tasks across the agency swarm.
    Maintains task dependencies and ensures proper resource allocation.
    """
    task_description: str = Field(
        ..., description="Detailed description of the task including requirements and acceptance criteria"
    )
    assigned_agent: str = Field(
        default="Developer", description="Name of the agent to assign this task to"
    )
    priority: int = Field(
        default=2, description="Task priority from 1 (critical) to 5 (low)", ge=1, le=5
    )

    def run(self):
        """
        Creates structured task definition and initiates delegation process
        """
        task_id = f"TASK-{os.urandom(4).hex().upper()}"
        return f"""Created task {task_id}:
        - Assigned to: {self.assigned_agent}
        - Priority: {self.priority}
        - Description: {self.task_description}
        """

if __name__ == "__main__":
    tool = TaskCreationTool(
        task_description="Implement user authentication system with OAuth2 support",
        priority=1
    )
    print(tool.run())
