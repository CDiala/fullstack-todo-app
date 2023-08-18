from flask import Flask, jsonify


def create_app(test_config=None):
    app = Flask(__name__)

    to_do_list = [1, 2, 3]

    '''Get all todo list items'''
    @app.route("/items", methods=['GET'])
    def get_items():
        return jsonify(to_do_list)

    '''Get specific todo item'''
    @app.route("/items/<item_id>")  # if param = <int:item_id>, no need to check if item_id is a string
    def get_item(item_id):
        try:
            if not item_id.isnumeric():
                return f"'{item_id}' is not a number. provide a number"

            if int(item_id) >= len(to_do_list):
                return f"No item found with id '{item_id}'"

            return jsonify(to_do_list[int(item_id)])
        except Exception as e:
            return f"error found in '{item_id}'"

    '''Add new todo item'''
    @app.route("/items", methods=['POST'])
    def add_new_item(item):
        to_do_list.append(int(item))
        return jsonify({
            'status': 200,
            'response': 'success',
            "data": to_do_list
        })

    return app
