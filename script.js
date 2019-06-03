function getRelativeFrequency(absoluteFrequencies, total) {
    let res = [];
    for (let fr of absoluteFrequencies){
        let frequency = fr/total;
        res[res.length] = { relative: frequency, percent: frequency*100, percentString: (frequency*100)+'%' }
    }

    return res;
}

function getTableRowsAbsoluteFrequency(tableRows, frequencyColIdx = 1, ignoreLastRow = true) {
    let res = [];

    let clone = tableRows.slice(0);

    if (ignoreLastRow) {
        clone.pop();
    }

    for(let row of clone){
        res.push(row[frequencyColIdx]);
    }

    return res;
}

function fillFrequenciesWithTotalsRow(tableRows, absoluteFrequencies) {
    let relativeFrequencies = getRelativeFrequency(absoluteFrequencies, window.respondents.length);

    let percentTotal = 0; // should be 100% at the end
    let frequencyTotal = 0; // should be 1 at the end

    for(let idx in relativeFrequencies){
        tableRows[idx][2] = relativeFrequencies[idx].relative;
        tableRows[idx][3] = relativeFrequencies[idx].percentString;

        frequencyTotal += relativeFrequencies[idx].relative;
        percentTotal += relativeFrequencies[idx].percent;
    }

    tableRows[tableRows.length-1][2] = frequencyTotal;
    tableRows[tableRows.length-1][3] = percentTotal+'%';

    return tableRows;
}

function mountTableRows(rowsNames, tableRowsObservable) {
    for (let idx in rowsNames){
        tableRowsObservable[idx] = [rowsNames[idx], 0, 0, 0];
    }

    tableRowsObservable[tableRowsObservable.length] = ['Totais', window.respondents.length, 0, 0];
}

function getChartColors() {
    let bgColors = [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(164,255,0, 0.2)',
    ];

    let borderColors = [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgb(164,255,0, 1)',
    ];

    return {
        backgroundColors: bgColors,
        borderColors: borderColors
    }
}

function setChartData(tableRows) {
    let labels = [];
    let dataset = [];

    let i = 0;

    //ignore last-row (totals)
    while (i < tableRows.length - 1){
        labels.push(tableRows[i][0]);
        dataset.push(tableRows[i][1]);
        i++;
    }

    return {
        labels: labels,
        dataset: dataset
    }
}
