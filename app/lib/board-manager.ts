import five from "johnny-five";

class BoardManager {
  private board: five.Board | null = null;
  private isReady = false;
  private readyPromise: Promise<void> | null = null;

  async initialize() {
    if (this.isReady && this.board) {
      return Promise.resolve();
    }

    if (this.readyPromise) {
      return this.readyPromise;
    }

    if (!this.board) {
      console.log("Initializing board for the first time...");
      this.readyPromise = new Promise((resolve, reject) => {
        this.board = new five.Board();

        this.board.on("ready", () => {
          console.log("Board is ready!");
          this.isReady = true;
          resolve();
        });

        this.board.on("error", (err) => {
          console.error("Board error:", err);
          reject(err);
        });

        setTimeout(() => {
          if (!this.isReady) {
            reject(new Error("Board initialization timeout"));
          }
        }, 10000);
      });
    }

    return this.readyPromise;
  }

  getBoard(): five.Board {
    if (!this.board || !this.isReady) {
      throw new Error("Board not initialized. Call initialize() first.");
    }
    return this.board;
  }

  isInitialized(): boolean {
    return this.isReady;
  }
}

// Use global to ensure singleton across Next.js module reloads
const globalForBoard = global as unknown as { boardManager: BoardManager };

export const boardManager = globalForBoard.boardManager || new BoardManager();

if (process.env.NODE_ENV !== "production") {
  globalForBoard.boardManager = boardManager;
}
