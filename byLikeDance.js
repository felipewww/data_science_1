new Vue({
    el: '#by-like-dance',
    data: {
        tableHeaders: [
            'Gosta de dançar',
            'Freq. Abs (fi)',
            'Freq. Rel (fr)',
            'Porcentagem (fr%)',
        ],
        tableRows: [],
    },
    mounted(){
        $colsNames = [
            'Sim',
            'Não'
        ];

        mountTableRows($colsNames, this.tableRows);

        for(let person of window.respondents){
            if (person.likeDance) {
                this.tableRows[1][1]++;
            } else {
                this.tableRows[0][1]++;
            }
        }

        let absoluteFrequencies = getTableRowsAbsoluteFrequency(this.tableRows);
        fillFrequenciesWithTotalsRow(this.tableRows, absoluteFrequencies);

        this.$forceUpdate();
    }
});