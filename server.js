/**
 * Created by fed on 16/8/3.
 */
const express = require('express');

const app = express();

app.use(express.static(__dirname));

app.listen(3000);
