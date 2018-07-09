class Task {
    constructor(title = '', description = '', status = false) {
        return {
            title,
            description,
            status
        };
    }
    complete() {
        this.status = true;
    }
}

module.exports = Task;