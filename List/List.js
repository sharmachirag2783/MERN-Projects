import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API } from '../constants';
import React from 'react';

const List = (props) => {
  try {
    const res = await axios.get(API + '/api/task/all', {
      headers: {
        'x-api-key': sessionStorage.getItem('authToken'),
      },
    });
    if (res.data.length > 0) setTask(res.data);
  } catch (error) {
    console.log(error.message);
  }
};
const [task, setTask] = useState([]);

export default List;
