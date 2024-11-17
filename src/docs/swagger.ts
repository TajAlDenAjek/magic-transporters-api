const swaggerDocs = {
    "openapi": "3.0.0",
    "info": {
        "title": "Magic Transporters API",
        "version": "1.0.0",
        "description": "API for managing Magic Movers and Items"
    },
    "servers": [
        {
            "url": "http://localhost:5000/api",
            "description": "Development server"
        }
    ],
    "components": {
        "schemas": {
            "MagicMover": {
                "type": "object",
                "properties": {
                    "_id": {
                        "type": "string"
                    },
                    "weightLimit": {
                        "type": "number"
                    },
                    "currentState": {
                        "type": "string",
                        "enum": [
                            "resting",
                            "loading",
                            "on-mission"
                        ]
                    },
                    "items": {
                        "type": "array",
                        "items": {
                            "$ref": "#/components/schemas/MagicItem"
                        }
                    },
                    "logs": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "properties": {
                                "timestamp": {
                                    "type": "string",
                                    "format": "date-time"
                                },
                                "action": {
                                    "type": "string"
                                },
                                "state": {
                                    "type": "string"
                                }
                            }
                        }
                    }
                }
            },
            "MagicItem": {
                "type": "object",
                "properties": {
                    "_id": {
                        "type": "string"
                    },
                    "name": {
                        "type": "string"
                    },
                    "weight": {
                        "type": "number"
                    },
                    "moverId": {
                        "type": "string"
                    }
                }
            }
        }
    },
    "paths": {
        "/magicMover": {
            "post": {
                "summary": "Add a new Magic Mover",
                "consumes": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "in": "body",
                        "name": "MagicMover",
                        "description": "Magic Mover object",
                        "schema": {
                            "$ref": "#/components/schemas/MagicMover"
                        }
                    }
                ],
                "responses": {
                    "201": {
                        "description": "Created",
                        "schema": {
                            "$ref": "#/components/schemas/MagicMover"
                        }
                    }
                }
            }
        },
        "/magicItem": {
            "post": {
                "summary": "Add a new Magic Item",
                "consumes": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "in": "body",
                        "name": "MagicItem",
                        "description": "Magic Item object",
                        "schema": {
                            "$ref": "#/components/schemas/MagicItem"
                        }
                    }
                ],
                "responses": {
                    "201": {
                        "description": "Created",
                        "schema": {
                            "$ref": "#/components/schemas/MagicItem"
                        }
                    }
                }
            }
        },
        "/magicMover/{id}/load": {
            "post": {
                "summary": "Load items onto a Magic Mover",
                "parameters": [
                    {
                        "in": "path",
                        "name": "id",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "in": "body",
                        "name": "MagicItems",
                        "description": "Array of item IDs to load",
                        "schema": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/components/schemas/MagicMover"
                        }
                    }
                }
            }
        },
        "/magicMover/{id}/start-mission": {
            "post": {
                "summary": "Start a mission for a Magic Mover",
                "parameters": [
                    {
                        "in": "path",
                        "name": "id",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/components/schemas/MagicMover"
                        }
                    }
                }
            }
        },
        "/magicMover/{id}/end-mission": {
            "post": {
                "summary": "End a mission for a Magic Mover",
                "parameters": [
                    {
                        "in": "path",
                        "name": "id",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/components/schemas/MagicMover"
                        }
                    }
                }
            }
        },
        "/magicMover/most-missions": {
            "get": {
                "summary": "Get list of Magic Movers sorted by most missions completed",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/components/schemas/MagicMover"
                            }
                        }
                    }
                }
            }
        }
    }
}

export default swaggerDocs