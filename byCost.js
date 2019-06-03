new Vue({
    el: '#by-cost',
    data: {
        tableHeaders: [
            'custo',
            'Freq. Abs (fi)',
            'Freq. Rel (fr)',
            'Porcentagem (fr%)',
        ],
        tableRows: [],
    },
    mounted(){

        $colsNames = [
            '20 |- 40',
            '40 |- 60',
            '60 |- 80',
            '80 |- 100',
            '100 ou +',
        ];

        mountTableRows($colsNames, this.tableRows);

        for(let person of window.respondents){
            let idxSelected = null;

            if (person.spendDisposition < 40) {
                idxSelected = 0;
            } else if (person.spendDisposition < 60) {
                idxSelected = 1;
            } else if (person.spendDisposition < 80) {
                idxSelected = 2;
            } else if (person.spendDisposition < 100) {
                idxSelected = 3;
            }  else {
                idxSelected = 4;
            }

            this.tableRows[idxSelected][1]++;
        }

        let absoluteFrequencies = getTableRowsAbsoluteFrequency(this.tableRows);
        fillFrequenciesWithTotalsRow(this.tableRows, absoluteFrequencies);

        this.$forceUpdate();
    }
});