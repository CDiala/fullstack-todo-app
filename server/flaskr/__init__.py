from flask import Flask, abort, jsonify, request
from flask_cors import CORS


def create_app():
    app = Flask(__name__)
    CORS(app)

    to_do_list = [
        {
            "id": 1,
            "name": "groceries",
            "isCompleted": True,
            "dateCreated": "01-05-2023",
            "dueDate": "05-05-2023"
        },
        {
            "id": 2,
            "name": "workout",
            "isCompleted": False,
            "dateCreated": "12-06-2023",
            "dueDate": "19-06-2023"
        },
        {
            "id": 3,
            "name": "cleaning",
            "isCompleted": True,
            "dateCreated": "05-07-2023",
            "dueDate": "12-07-2023"
        },
        {
            "id": 4,
            "name": "study",
            "isCompleted": False,
            "dateCreated": "22-08-2023",
            "dueDate": "29-08-2023"
        },
        {
            "id": 5,
            "name": "gardening",
            "isCompleted": True,
            "dateCreated": "11-09-2023",
            "dueDate": "18-09-2023"
        },
        {
            "id": 6,
            "name": "painting",
            "isCompleted": False,
            "dateCreated": "25-10-2023",
            "dueDate": "01-11-2023"
        },
        {
            "id": 7,
            "name": "reading",
            "isCompleted": True,
            "dateCreated": "03-11-2023",
            "dueDate": "10-11-2023"
        },
        {
            "id": 8,
            "name": "cooking",
            "isCompleted": False,
            "dateCreated": "15-12-2023",
            "dueDate": "22-12-2023"
        },
        {
            "id": 9,
            "name": "meditation",
            "isCompleted": True,
            "dateCreated": "07-01-2024",
            "dueDate": "14-01-2024"
        },
        {
            "id": 10,
            "name": "coding",
            "isCompleted": False,
            "dateCreated": "19-02-2024",
            "dueDate": "26-02-2024"
        }
    ]

    # Add headers
    # @app.after_request
    # def after_request(response):
    #     response.headers.add('Access-Control-Allow-Headers',
    #                          'Content-Type')
    #     response.headers.add(
    #         'Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH')
    #     return response

    '''Helper service to return specific todo item'''
    def get_todo_item(item_id):
        selected_item = [item for item in to_do_list if item['id'] == item_id]
        return selected_item if len(selected_item) > 0 else None

    '''Get all todo list items'''
    @app.route("/items", methods=['GET'])
    def get_items():
        to_do_list
        return jsonify(to_do_list)

    '''Get specific todo item'''
    @app.route("/items/<int:item_id>", methods=['GET'])
    def get_item(item_id):
        try:
            if int(item_id) > len(to_do_list):
                return f"No item found with id '{item_id}'"

            selected_item = get_todo_item(item_id)

            return jsonify(selected_item)
        except Exception as e:
            return f"error found in '{item_id}', {e}"

    '''Add new todo item'''
    @app.route("/items", methods=['POST'])
    def add_new_item():
        try:
            body = request.get_json()

            if 'data' in body and len((body['data']).values()) > 0:
                new_todo_item = {
                    **body['data'], 'id': to_do_list[len(to_do_list) - 1]['id'] + 1}

                to_do_list.append(new_todo_item)

                return jsonify({
                    'status': 200,
                    'response': 'success',
                    'data': new_todo_item
                })

            else:
                return abort(400)

        except Exception as e:
            return f"Unable to process request, {e}"

    '''Update existing todo item'''
    @app.route('/items/<int:todo_id>', methods=['PATCH'])
    def update_item(todo_id):
        body = request.get_json()

        # Get todo item from body
        if not 'todo' in body:
            return f'No record provided for update.'

        todo_item = get_todo_item(todo_id)[0]
        todo_index = to_do_list.index(todo_item)

        if body is None:
            return f'No item to be updated'
        else:
            to_do_list[todo_index] = body['todo']

        return jsonify({
            'status': 200,
            'response': 'updated successfully',
            'data': to_do_list[todo_index]
        })

    '''Delete existing todo item'''
    @app.route('/items/<int:todo_id>', methods=['DELETE'])
    def delete_item(todo_id):
        todo_item = get_todo_item(todo_id)

        if todo_item is None:
            return f'No item to be deleted'
        else:
            todo_index = to_do_list.index(todo_item[0])
            to_do_list.pop(todo_index)
            to_do_list

        return jsonify({
            'status': 200,
            'response': 'deleted successfully',
            'data': todo_id
        })

    return app


create_app()
