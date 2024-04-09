import { Component } from '@angular/core';
import { Suggestion } from '../suggestion.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.css']
})
export class SuggestionComponent {

  isExpanded: boolean = false;

  togglePopup() {
    this.isExpanded = !this.isExpanded;
  }
  
  newSuggestion: Suggestion = {
    id: 0, 
    title: '',
    category: '',
    description: '',
    votes: 0,
    isPrivate: false
  };

  suggestions: Suggestion[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadSuggestions();
  }

  loadSuggestions() {
    this.getAllSuggestions()
      .subscribe(
        (suggestions: Suggestion[]) => {
          this.suggestions = suggestions;
        },
        (error: any) => {
          console.error('Error fetching suggestions:', error);
        }
      );
  }

  getAllSuggestions(): Observable<Suggestion[]> {
    return this.http.get<Suggestion[]>('http://localhost:3000/suggestions');
  }

  submitSuggestion() {
    // Add the new suggestion to the list
    this.suggestions.push(this.newSuggestion);

    // POST the new suggestion to your API
    this.http.post<any>('http://localhost:3000/suggestions', this.newSuggestion)
      .subscribe(
          (response: any) => {
            console.log('Suggestion saved successfully:', response);
          },
          (error: any) => {
            console.error('Error saving suggestion:', error);
          }
      );

    // Clear the form
    this.newSuggestion = {
      id: 0, 
      title: '',
      category: '',
      description: '',
      votes: 0,
      isPrivate: false
    };
  }

  upvote(suggestion: Suggestion) {
 
    suggestion.votes++;
    
     this.http.put<any>('http://localhost:3000/suggestions/' + suggestion.id, suggestion)
     .subscribe(
      (response: any) => {
        console.log('Suggestion saved successfully:', response);
      },
      (error: any) => {
        console.error('Error saving suggestion:', error);
      }
     );
  }
  
  downvote(suggestion: Suggestion) {
    suggestion.votes--;
    this.http.put<any>('http://localhost:3000/suggestions/' + suggestion.id, suggestion)
     .subscribe(
      (response: any) => {
        console.log('Suggestion saved successfully:', response);
      },
      (error: any) => {
        console.error('Error saving suggestion:', error);
      }
     );
  }
}
