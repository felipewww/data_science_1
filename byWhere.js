new Vue({
    el: '#by-where',
    data: {
        tableHeaders: [
            'local da festa',
            'Freq. Abs (fi)',
            'Freq. Rel (fr)',
            'Porcentagem (fr%)',
        ],
        tableRows: [],
    },
    mounted(){
        $colsNames = [
            'Restaurante noite',
            'Restaurante dia',
            'Bar noite',
            'Chácar dia',
        ];

        mountTableRows($colsNames, this.tableRows);

        for(let person of window.respondents){
            this.tableRows[person.where][1]++;
        }

        let absoluteFrequencies = getTableRowsAbsoluteFrequency(this.tableRows);
        fillFrequenciesWithTotalsRow(this.tableRows, absoluteFrequencies);

        this.$forceUpdate();
    }
});