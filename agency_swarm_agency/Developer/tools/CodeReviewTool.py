from agency_swarm.tools import BaseTool
from pydantic import Field
import ast
import os
from dotenv import load_dotenv

load_dotenv()


class CodeReviewTool(BaseTool):
    """
    Analyzes code quality, checks for PEP8 compliance, security vulnerabilities, 
    and potential performance issues. Provides detailed improvement suggestions.
    """
