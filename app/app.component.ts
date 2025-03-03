import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [CommonModule]
})
export class AppComponent {
  title = 'booksapp';
  readonly APIUrl = "http://localhost:5038/api/books/";
  books: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.refreshBooks();
  }

  refreshBooks() {
    this.http.get<any[]>(this.APIUrl + 'GetBooks').subscribe(
      (data) => {
        this.books = data;
        console.log("Fetched books:", this.books);
      },
      (error) => {
        console.error("Error fetching books:", error);
      }
    );
  }

  addBook() {
    var newBook = (<HTMLInputElement>document.getElementById("newBook")).value;
    var newDesc = (<HTMLInputElement>document.getElementById("newDesc")).value;
    var newPrice = (<HTMLInputElement>document.getElementById("newPrice")).value;
  
    if (!newBook.trim() || !newDesc.trim() || !newPrice.trim()) {
      alert("All fields are required!");
      return;
    }
  
    var formData = new FormData();
    formData.append("title", newBook);
    formData.append("description", newDesc);
    formData.append("price", newPrice);
  
    this.http.post(this.APIUrl + 'AddBook', formData).subscribe(
      (data) => {
        alert("Book added successfully!");
        this.refreshBooks();
      },
      (error) => {
        console.error("Error adding book:", error);
        alert("Failed to add book.");
      }
    );
  }  

  deleteBook(id: any) {
    this.http.delete(this.APIUrl + 'DeleteBook?id=' + id).subscribe(
      (data) => {
        alert("Book deleted successfully!");
        this.refreshBooks();
      },
      (error) => {
        console.error("Error deleting book:", error);
        alert("Failed to delete book.");
      }
    );
  }
}
