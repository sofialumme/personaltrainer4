import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

function Statistics() {
    const _ = require('lodash');

    const [trainings, setTrainings] = useState([]);

    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
            .then(response => response.json())
            .then(data => _(data).groupBy('activity')
                .map((training, id) => ({
                    activity: id,
                    duration: _.sumBy(training, 'duration')
                })).value())
            .then(data => setTrainings(data))
    }

    useEffect(() => {
        fetchTrainings();
    }, [])

    return (
        <div>
            <BarChart
                width={1200}
                height={600}
                data={trainings}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <XAxis dataKey="activity" />
                <YAxis label={{ value: 'Duration (min)', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Bar dataKey="duration" fill="#1769aa" />
            </BarChart>
        </div>
    );
};

export default Statistics;