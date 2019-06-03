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
        $colsNames = [
            '18 |- 24',
            '24 |- 30',
            '30 |- 36',
            '36 |- 42',
            '42 |- 48',
            '48 ou +',
        ];

        mountTableRows($colsNames, this.tableRows);

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

        let absoluteFrequencies = getTableRowsAbsoluteFrequency(this.tableRows);
        fillFrequenciesWithTotalsRow(this.tableRows, absoluteFrequencies);

        this.$forceUpdate();
    }
});