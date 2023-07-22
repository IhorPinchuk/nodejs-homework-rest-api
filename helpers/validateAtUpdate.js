const validateAtUpdate = (next) => {
    this.options.runValidators = true;
    next();
}

export default validateAtUpdate;