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

function byGenre() {
    let men = 0;
    let women = 0;

    for(let person of window.respondents){
        if (person.genre === 0) {
            men++;
        } else {
            women++;
        }
    }

    let men_fi = men/window.respondents.length;
    let women_fi = women/window.respondents.length;

    let tr_men = document.getElementById('by-genre-men');
    let tr_women = document.getElementById('by-genre-women');
    let tr_totals = document.getElementById('by-genre-totals');

    tr_men.getElementsByTagName('td')[1].innerHTML = men;
    tr_women.getElementsByTagName('td')[1].innerHTML = women;
    tr_totals.getElementsByTagName('td')[1].innerHTML = men+women;

    tr_men.getElementsByTagName('td')[2].innerHTML = men_fi;
    tr_women.getElementsByTagName('td')[2].innerHTML = women_fi;
    tr_totals.getElementsByTagName('td')[2].innerHTML = men_fi+women_fi;

    tr_men.getElementsByTagName('td')[3].innerHTML = (men_fi*100)+'%';
    tr_women.getElementsByTagName('td')[3].innerHTML = (women_fi*100)+'%';
    tr_totals.getElementsByTagName('td')[3].innerHTML = ((men_fi+women_fi)*100)+'%';
}

byGenre();
// console.log(window.respondents);