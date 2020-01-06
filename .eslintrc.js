module.exports = {
    "env": {
        "es6": true,
        "node": true
    },
    "extends": [
        "standard",
        'prettier',
        'prettier/react'
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parser": "@typescript-eslint/parser",

    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
      'react',
      'import',
      'jsx-a11y',
      'react-hooks',
      'prettier',
        "@typescript-eslint",

    ],
    "rules": {
      'prettier/prettier': 'error',
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx'] }],
    'import/prefer-default-export': 'off',

    },

};
