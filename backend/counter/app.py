import json
import os

import boto3

_table = None


def get_table():
    """Create the DynamoDB table client once and reuse it between invocations."""
    global _table
    if _table is None:
        _table = boto3.resource("dynamodb").Table(os.environ["TABLE_NAME"])
    return _table


def lambda_handler(event, context):
    # ADD is atomic: two visitors at the same moment both get counted.
    result = get_table().update_item(
        Key={"id": "visits"},
        UpdateExpression="ADD #count :one",
        ExpressionAttributeNames={"#count": "count"},
        ExpressionAttributeValues={":one": 1},
        ReturnValues="UPDATED_NEW",
    )
    visits = int(result["Attributes"]["count"])
    return {
        "statusCode": 200,
        "headers": {"Content-Type": "application/json", "Cache-Control": "no-store"},
        "body": json.dumps({"visits": visits}),
    }
