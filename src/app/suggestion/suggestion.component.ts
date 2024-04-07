import { Component } from '@angular/core';
import { Suggestion } from '../suggestion.model';

@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.css']
})
export class SuggestionComponent {
  
  newSuggestion: Suggestion = {
    id: 0, 
    category: '',
    description: '',
    votes: 0,
    isPrivate: false
  };

  suggestions: Suggestion[] = [];

  submitSuggestion() {
    // Add the new suggestion to the list
    this.suggestions.push(this.newSuggestion);

    // Clear the form
    this.newSuggestion = {
      id: 0, 
      category: '',
      description: '',
      votes: 0,
      isPrivate: false
    };
  }

  upvote(suggestion: Suggestion) {
    suggestion.votes++;
  }
  
  downvote(suggestion: Suggestion) {
    suggestion.votes--;
  }
}
