export class CommonHelper {
  private readonly MIN_DELAY = 1;
  private readonly MAX_DELAY = 5;

  getRandomDelay(): number {
    return (Math.floor(Math.random() * (this.MAX_DELAY - this.MIN_DELAY + 1)) + this.MIN_DELAY);
  }
}
