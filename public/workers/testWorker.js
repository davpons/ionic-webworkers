self.addEventListener('message', e => {
    const result = e.data.reduce((total, current) => {
        return total + current;
    }, 0);

    self.postMessage(result);
})