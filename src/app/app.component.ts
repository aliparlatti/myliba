import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MyLiba Register';
  public users: any = [];
  public statusUpdate: boolean = false;
  public user_id: string = '';

  getAllUsers() {
    this.db.collection('users').snapshotChanges().subscribe((response) => {
      this.users = response.map(item =>
        Object.assign({ id: item.payload.doc.id }, item.payload.doc.data()),
      );
    })
  }
  alertSuccess(head:string,message:string){
    Swal.fire(head, message, 'success');
  }
  alertWarning(head:string,message:string){
    Swal.fire(head, message, 'error');
  }
  onUpdate(id: string) {
    this.statusUpdate = false;
    console.log(id);

    const name = this.registerForm.controls['name'].value;
    const mail = this.registerForm.controls['mail'].value;
    const password = this.registerForm.controls['pass'].value;
    let data = {
      'name': name,
      'mail': mail,
      'pass': password
    };
    this.db.collection('users').doc(id).set(data);
    this.clearForm();
   this.alertSuccess('Başarılı','Kayıt Güncellendi');
  }
  onDelete(id: string) {
    this.db.collection('users').doc(id).delete();
    this.alertWarning('Başarılı','Kayıt Silindi');
  }
  onEdit(id: string) {
    this.user_id = id;
    this.statusUpdate = true;
    let user = this.users.find((x: { id: string; }) => x.id === id);
    this.registerForm = this.formBuilder.group({
      name: user.name,
      mail: user.mail,
      pass: user.pass,
    });
  }
  ngOnInit(): void {
    this.clearForm();
    this.getAllUsers();
  }
  clearForm() {
    this.registerForm = this.formBuilder.group({
      name: '',
      mail: '',
      pass: ''
    });
  }
  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    mail: new FormControl('', [Validators.required]),
    pass: new FormControl('', [Validators.required])
  });
  constructor(private formBuilder: FormBuilder,
    private db: AngularFirestore) {

  }
  onSubmit() {
    const name = this.registerForm.controls['name'].value;
    const mail = this.registerForm.controls['mail'].value;
    const password = this.registerForm.controls['pass'].value;
    let data = {
      'name': name,
      'mail': mail,
      'pass': password
    };
    this.db.collection('users').add(data);
    this.clearForm();
    this.alertSuccess('Başarılı','Kayıt Tamamlandı');
  }

  get rf() {
    return this.registerForm.controls;
  }
}
