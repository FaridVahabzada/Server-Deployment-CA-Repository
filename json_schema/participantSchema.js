var participantSchema = {
    "$schema": "https://json-schema.org/draft/2019-09/schema",
    "$id": "http://localhost:3000/",
    "type": "object",
    "default": {},
    "title": "Root Schema",
    "required": [
        "participant",
        "work",
        "home"
    ],
    "properties": {
        "participant": {
            "type": "array",
            "default": [],
            "title": "The participant Schema",
            "items": {
                "type": "object",
                "default": {},
                "title": "A Schema",
                "required": [
                    "email",
                    "fistname",
                    "lastname",
                    "dob"
                ],
                "properties": {
                    "email": {
                        "type": "string",
                        "pattern": "^\\S+@\\S+\\.\\S+$",
                        "format": "email",
                        "default": "",
                        "minLength": 6,
          				"maxLength": 130,
                        "title": "The email Schema",
                        "examples": [
                            "xxx@gmail.com"
                        ]
                    },
                    "fistname": {
                        "type": "string",
                        "pattern": "^[A-Za-z\\s]*$",
                        "minLength": 2,
          				"maxLength": 100,
                        "default": "",
                        "title": "The fistname Schema",
                        "examples": [
                            "XXX"
                        ]
                    },
                    "lastname": {
                        "type": "string",
                        "pattern": "^[A-Za-z\\s]*$",
                        "minLength": 2,
          				"maxLength": 100,
                        "default": "",
                        "title": "The lastname Schema",
                        "examples": [
                            "XXX"
                        ]
                    },
                    "dob": {
                        "type": "string",
                        "default": "",
                        "format": "date",
                        "title": "The dob Schema",
                        "examples": [
                            "2000-12-31"
                        ]
                    }
                },
                "examples": [{
                    "email": "xxx@gmail.com",
                    "fistname": "XXX",
                    "lastname": "XXX",
                    "dob": "2000-12-31"
                }]
            },
            "examples": [
                [{
                    "email": "xxx@gmail.com",
                    "fistname": "XXX",
                    "lastname": "XXX",
                    "dob": "2000-12-31"
                }]
            ]
        },
        "work": {
            "type": "array",
            "default": [],
            "title": "The work Schema",
            "items": {
                "type": "object",
                "default": {},
                "title": "A Schema",
                "required": [
                    "companyname",
                    "salary",
                    "currency"
                ],
                "properties": {
                    "companyname": {
                        "type": "string",
                        "pattern": "^[A-Za-z\\s]*$",
                        "minLength": 2,
          				"maxLength": 200,
                        "default": "",
                        "title": "The companyname Schema",
                        "examples": [
                            "YYY"
                        ]
                    },
                    "salary": {
                        "type": "number",
                        "default": 0.0,
                        "title": "The salary Schema",
                        "examples": [
                            1000.45
                        ]
                    },
                    "currency": {
                        "type": "string",
                        "pattern": "^[A-Za-z\\s]*$",
                        "minLength": 2,
          				"maxLength": 100,
                        "default": "",
                        "title": "The currency Schema",
                        "examples": [
                            "USD"
                        ]
                    }
                },
                "examples": [{
                    "companyname": "YYY",
                    "salary": 1000.45,
                    "currency": "USD"
                }]
            },
            "examples": [
                [{
                    "companyname": "YYY",
                    "salary": 1000.45,
                    "currency": "USD"
                }]
            ]
        },
        "home": {
            "type": "array",
            "default": [],
            "title": "The home Schema",
            "items": {
                "type": "object",
                "default": {},
                "title": "A Schema",
                "required": [
                    "country",
                    "city"
                ],
                "properties": {
                    "country": {
                        "type": "string",
                        "pattern": "^[A-Za-z\\s]*$",
                        "minLength": 2,
          				"maxLength": 200,
                        "default": "",
                        "title": "The country Schema",
                        "examples": [
                            "USA"
                        ]
                    },
                    "city": {
                        "type": "string",
                        "pattern": "^[A-Za-z\\s]*$",
                        "minLength": 2,
          				"maxLength": 200,
                        "default": "",
                        "title": "The city Schema",
                        "examples": [
                            "Washington"
                        ]
                    }
                },
                "examples": [{
                    "country": "USA",
                    "city": "Washington"
                }]
            },
            "examples": [
                [{
                    "country": "USA",
                    "city": "Washington"
                }]
            ]
        }
    },
    "examples": [{
        "participant": [{
            "email": "xxx@gmail.com",
            "fistname": "XXX",
            "lastname": "XXX",
            "dob": "2000-12-31"
        }],
        "work": [{
            "companyname": "YYY",
            "salary": 1000.45,
            "currency": "USD"
        }],
        "home": [{
            "country": "USA",
            "city": "Washington"
        }]
    }]
};

module.exports = participantSchema;