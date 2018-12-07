// 导入ES6, ES7 js
import './module.js';

// 导入css
import './style1.css';

// 导入scss
import './style2.scss';

// 导入json文件
import JsonData from './data.json';
console.log('\nTest import JSON file. Datatype: %s, data string: %s', typeof JsonData, JSON.stringify(JsonData, null, '    '));

// 导入csv文件
import csvData from './data.csv';
console.log('\nTest import csv file. Datatype: %s, data string: ', typeof csvData, JSON.stringify(csvData, null, '    '));

// 导入xml文件
import xmlData from './data.xml';
console.log('\nTest import xml file. Datatype: %s, data string: %s', typeof xmlData, JSON.stringify(xmlData, null, '    '));

// 