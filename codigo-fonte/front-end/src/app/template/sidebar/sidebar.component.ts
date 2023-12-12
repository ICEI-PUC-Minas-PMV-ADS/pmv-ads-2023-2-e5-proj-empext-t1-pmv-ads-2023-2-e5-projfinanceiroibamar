import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  @Input() public openSidebar:any;

  /*menuSidebar = [
    {
      link_name: "Dashboard",
      link: "/dashboard",
      icon: "bx bx-grid-alt",
      sub_menu: []
    }, {
      link_name: "Category2",
      link: null,
      icon: "bx bx-collection",
      sub_menu: [
        {
          link_name: "HTML & CSS",
          link: "/html-n-css",
        }, {
          link_name: "JavaScript",
          link: "/javascript",
        }, {
          link_name: "PHP & MySQL",
          link: "/php-n-mysql",
        }
      ]
    }, {
      link_name: "Posts",
      link: null,
      icon: "bx bx-book-alt",
      sub_menu: [
        {
          link_name: "Web Design",
          link: "/posts/web-design",
        }, {
          link_name: "Login Form",
          link: "/posts/login-form",
        }, {
          link_name: "Card Design",
          link: "/posts/card-design",
        }
      ]
    }, {
      link_name: "Analytics",
      link: "/analytics",
      icon: "bx bx-pie-chart-alt-2",
      sub_menu: []
    }, {
      link_name: "Chart",
      link: "/chart",
      icon: "bx bx-line-chart",
      sub_menu: []
    }, {
      link_name: "Plugins",
      link: null,
      icon: "bx bx-plug",
      sub_menu: [
        {
          link_name: "UI Face",
          link: "/ui-face",
        }, {
          link_name: "Pigments",
          link: "/pigments",
        }, {
          link_name: "Box Icons",
          link: "/box-icons",
        }
      ]
    }, {
      link_name: "Explore2",
      link: "/explore",
      icon: "bx bx-compass",
      sub_menu: []
    }, {
      link_name: "History",
      link: "/history",
      icon: "bx bx-history",
      sub_menu: []
    }, {
      link_name: "Setting",
      link: "/setting",
      icon: "bx bx-cog",
      sub_menu: []
    }, {
      link_name: "Log out",
      link: "/exit",
      icon: "bx bx-log-out",
      sub_menu: []
    }
  ]*/

  menuSidebar = [
    /*{
      link_name: "Dashboard",
      link: "/dashboard",
      icon: "bx bx-grid-alt",
      sub_menu: []
    },*/{
      link_name: "Cadastro",
      link: null,
      icon: "bx bx-collection",
      sub_menu: [
        {
          link_name: "Categorias",
          link: "/categorias",
        }, {
          link_name: "Contas",
          link: "/contas",
        }, {
          link_name: "Fornecedores",
          link: "/fornecedores",
        }, {
          link_name: "Membros",
          link: "/membros",
        }
      ]
    }, {
      link_name: "Financeiro",
      link: null,
      icon: "bx bx-pie-chart-alt-2",
      sub_menu: [
        {
          link_name: "Receitas",
          link: "/receitas",
        }
        , {
          link_name: "Despesas",
          link: "/despesas",
        }
      ]
    },{
      link_name: "Relatórios",
      link: null,
      icon: "bx bx-plug",
      sub_menu: [
        {
          link_name: "Receitas",
          link: "/relatorios/receitas",
        }, {
          link_name: "Despesas",
          link: "/relatorios/despesas",
        }, {
          link_name: "Mensal",
          link: "/relatorios/mensal",
        }
      ]
    }, {
      link_name: "Configurações",
      link: "null",
      icon: "bx bx-cog",
      sub_menu: [
        {
          link_name: "Usuários",
          link: "/usuarios",
        }
      ]
    }
  ];


  usuarioLogado: string = "";

  constructor(private authService: AuthService) { }

  ngOnInit() { 
    this.usuarioLogado = this.authService.getUsuarioAutenticado();
  }

  showSubmenu(itemEl: HTMLElement) {
    itemEl.classList.toggle("showMenu");
  }

  logout(){
    this.authService.encerrarSessao();
  }


}
