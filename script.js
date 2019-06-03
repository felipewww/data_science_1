// var ctx = document.getElementById('myChart');
// var myChart = new Chart(ctx, {
//     type: 'bar',
//     data: {
//         labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//         datasets: [{
//             label: '# of Votes',
//             data: [12, 19, 3, 5, 2, 3],
//             backgroundColor: [
//                 'rgba(255, 99, 132, 0.2)',
//                 'rgba(54, 162, 235, 0.2)',
//                 'rgba(255, 206, 86, 0.2)',
//                 'rgba(75, 192, 192, 0.2)',
//                 'rgba(153, 102, 255, 0.2)',
//                 'rgba(255, 159, 64, 0.2)'
//             ],
//             borderColor: [
//                 'rgba(255, 99, 132, 1)',
//                 'rgba(54, 162, 235, 1)',
//                 'rgba(255, 206, 86, 1)',
//                 'rgba(75, 192, 192, 1)',
//                 'rgba(153, 102, 255, 1)',
//                 'rgba(255, 159, 64, 1)'
//             ],
//             borderWidth: 1
//         }]
//     },
//     options: {
//         scales: {
//             yAxes: [{
//                 ticks: {
//                     beginAtZero: true
//                 }
//             }]
//         }
//     }
// });

//GENDER
new Vue({
    el: '#by-gender',
    data: {
        tableHeaders: [
            'sexo',
            'Freq. Abs (fi)',
            'Freq. Rel (fr)',
            'Porcentagem (fr%)',
        ],
        tableRows: [],
    },
    mounted(){
        let men = 0;
        let women = 0;

        for(let person of window.respondents){
            if (person.genre === 0) {
                men++;
            } else {
                women++;
            }
        }

        let relativeFrequencies = getRelativeFrequency([men, women], window.respondents.length);
        let men_fr = relativeFrequencies[0];
        let women_fr = relativeFrequencies[1];

        this.tableRows[0] = [
            'M',
            men,
            men_fr.relative,
            men_fr.percentString,
        ];

        this.tableRows[1] = [
            'F',
            women,
            women_fr.relative,
            women_fr.percentString,
        ];

        this.tableRows[2] = [
            'Totais',
            men + women,
            men_fr.relative+women_fr.relative,
            (men_fr.percent + women_fr.percent)+'%',
        ];

        this.$forceUpdate();
    }
});

//AGE
new Vue({
    el: '#by-age',
    data: {
        tableHeaders: [
            'Idade',
            'Freq. Abs (fi)',
            'Freq. Rel (fr)',
            'Porcentagem (fr%)',
        ],
        tableRows: [],
    },
    mounted(){
        this.tableRows[0] = ['18 |- 24', 0, 0, 0,];
        this.tableRows[1] = ['24 |- 30', 0, 0, 0,];
        this.tableRows[2] = ['30 |- 36', 0, 0, 0,];
        this.tableRows[3] = ['36 |- 42', 0, 0, 0,];
        this.tableRows[4] = ['42 |- 48', 0, 0, 0,];
        this.tableRows[5] = ['48 ou +', 0, 0, 0,];
        this.tableRows[6] = ['Totais', window.respondents.length, 0, 0,];

        for(let person of window.respondents){
            let idxSelected = null;

            if (person.age < 24) {
                idxSelected = 0;
            } else if (person.age < 30) {
                idxSelected = 1;
            } else if (person.age < 36) {
                idxSelected = 2;
            } else if (person.age < 42) {
                idxSelected = 3;
            } else if (person.age < 48) {
                idxSelected = 4;
            } else {
                idxSelected = 5;
            }

            this.tableRows[idxSelected][1]++;
        }

        let absoluteFre = [
            this.tableRows[0][1],
            this.tableRows[1][1],
            this.tableRows[2][1],
            this.tableRows[3][1],
            this.tableRows[4][1],
            this.tableRows[5][1],
        ];

        let relativeFrequencies = getRelativeFrequency(absoluteFre, window.respondents.length);

        let percentTotal = 0; // should be 100% at the end
        let frequencyTotal = 0; // should be 1 at the end

        for(let idx in relativeFrequencies){
            this.tableRows[idx][2] = relativeFrequencies[idx].relative;
            this.tableRows[idx][3] = relativeFrequencies[idx].percentString;

            frequencyTotal += relativeFrequencies[idx].relative;
            percentTotal += relativeFrequencies[idx].percent;
        }

        this.tableRows[6][2] = frequencyTotal;
        this.tableRows[6][3] = percentTotal+'%';

        this.$forceUpdate();
    }
});

function getRelativeFrequency(absoluteFrequencies, total) {
    let res = [];
    for (let fr of absoluteFrequencies){
        let frequency = fr/total;
        res[res.length] = { relative: frequency, percent: frequency*100, percentString: (frequency*100)+'%' }
    }

    return res;
}
