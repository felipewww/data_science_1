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
        $colsNames = [
            'Masculino',
            'Feminino'
        ];

        mountTableRows($colsNames, this.tableRows);

        for(let person of window.respondents){
            if (person.genre === 0) {
                this.tableRows[0][1]++;
            } else {
                this.tableRows[1][1]++;
            }
        }

        let absoluteFrequencies = getTableRowsAbsoluteFrequency(this.tableRows);
        fillFrequenciesWithTotalsRow(this.tableRows, absoluteFrequencies);

        this.$forceUpdate();
    }
});