new Vue({
    el: '#by-music',
    data: {
        tableHeaders: [
            'comida',
            'Freq. Abs (fi)',
            'Freq. Rel (fr)',
            'Porcentagem (fr%)',
        ],
        tableRows: [],
    },
    mounted(){
        $colsNames = [
            'Ambiente',
            'Eletrônica',
            'Samba',
            'MPB',
            'Forró',
            'Sertanejo',
            'Rock',
            'Todos',
        ];

        mountTableRows($colsNames, this.tableRows);

        for(let person of window.respondents){
            this.tableRows[person.preferredMusic][1]++;
        }

        let absoluteFrequencies = getTableRowsAbsoluteFrequency(this.tableRows);
        fillFrequenciesWithTotalsRow(this.tableRows, absoluteFrequencies);

        this.$forceUpdate();
    }
});