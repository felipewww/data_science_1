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
        this.$nextTick(() => {
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
        });
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
