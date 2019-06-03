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