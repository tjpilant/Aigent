from flask import request, jsonify

class APIManager:
    def __init__(self):
        pass

    def process_ocr(self):
        """
        Process OCR request
        """
        if request.method != 'POST':
            return jsonify({"error": "Method not allowed"}), 405
            
        try:
            return jsonify({"message": "OCR endpoint ready"}), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500
