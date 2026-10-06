import json
import os
import sys
from decimal import Decimal
from unittest.mock import MagicMock, patch

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "counter"))

import app  # noqa: E402


def fake_table(count):
    table = MagicMock()
    table.update_item.return_value = {"Attributes": {"count": Decimal(count)}}
    return table


def test_returns_new_count_as_json():
    with patch.object(app, "get_table", return_value=fake_table(42)):
        response = app.lambda_handler({}, None)

    assert response["statusCode"] == 200
    assert response["headers"]["Content-Type"] == "application/json"
    assert json.loads(response["body"]) == {"visits": 42}


def test_adds_exactly_one_to_the_visits_item():
    table = fake_table(1)
    with patch.object(app, "get_table", return_value=table):
        app.lambda_handler({}, None)

    table.update_item.assert_called_once()
    kwargs = table.update_item.call_args.kwargs
    assert kwargs["Key"] == {"id": "visits"}
    assert kwargs["UpdateExpression"].startswith("ADD")
    assert kwargs["ExpressionAttributeValues"] == {":one": 1}


def test_response_is_not_cached():
    with patch.object(app, "get_table", return_value=fake_table(7)):
        response = app.lambda_handler({}, None)

    assert response["headers"]["Cache-Control"] == "no-store"
