import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const dialogflowURL = 'https://us-central1-ayuda-epico-ksgg.cloudfunctions.net/dialogflowGateway';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent implements OnInit {

  messages = [];
  loading = false;

  // Random ID to maintain session with server
  sessionId = Math.random().toString(36).slice(-5);

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.addBotMessage('Bienvenido al bot de ayuda de Epico!, ¿Cual es tu nombre?');
  
    
  }

  handleUserMessage(event) {
    const text = event.message;
    this.addUserMessage(text);
     
    this.loading = true;

    // Make an HTTP Request
    this.http.post<any>(
      dialogflowURL,
      {
        sessionId: this.sessionId,
        queryInput: {
          // event: {
          //   name: 'USER_ONBOARDING',
          //   languageCode: 'en-US'
          // },
          text: {
            text,
            languageCode: 'es-EC'
          }
        }
      }
    )
    .subscribe(res => {
      this.addBotMessage(res.fulfillmentText);
      this.loading = false;

      if(res.displayName="ayuda.inicio_sesion"){
        
      }
    });
  }

funcionBienvenida(){
 
}
  // Helpers

  addUserMessage(text) {
    this.messages.push({
      text,
      sender: 'Tu',
      reply: true,
      date: new Date()
    });
  }

  addBotMessagewithFile(file) {
    this.messages.push({
      
      sender: 'Asistente de Epico',
      avatar: '/assets/imgbot.png',
      date: new Date(),
      files: file
      
    });
  }

  addBotMessage(text) {
    this.messages.push({
      text,
      sender: 'Asistente de Epico',
      avatar: '/assets/imgbot.png',
      date: new Date(),
      
      
    });
  }
  sendMessage(event: any) {
    const files = !event.files ? [] : event.files.map((file) => {
      return {
        url: file.src,
        type: file.type,
        icon: 'file-text-outline',
      };
    });

    this.messages.push({
      text: event.message,
      date: new Date(),
      sender:"Asistente de Epico",
      avatar: '/assets/imgbot.png',
      type: files.length ? 'file' : 'text',
      files: files,
      
    });
    
  }
}

