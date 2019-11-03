export class Paginate {
    constructor(
        public total = 0,
        public page = 1,
        public skip = 0,
        public limit = 5
    ) { }
}