export class Task {
  constructor(
    public id: string,
    public projectId: string,
    public title: string,
    public done: boolean = false
  ) {}
}