function getRelativeFrequency(absoluteFrequencies, total) {
    let res = [];
    for (let fr of absoluteFrequencies){
        let frequency = fr/total;
        res[res.length] = { relative: frequency, percent: frequency*100, percentString: (frequency*100)+'%' }
    }

    return res;
}
