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