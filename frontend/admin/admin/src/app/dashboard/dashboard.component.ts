import { Component, OnInit } from '@angular/core';
import { CrudService } from '../Service/crud.service';
import { Chart, ChartType, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    totalAdmins: number = 0;
    totalClients: number = 0;
    totalTuteurs: number = 0;
    totalCours: number = 0;
    totalCategorie: number = 0;
    totalSpecilaite: number = 0;
    totalExpertise: number = 0;
    doughnutChart: Chart | null = null;
    totalContact : number =0 ;

    constructor(private service: CrudService) { }

    ngOnInit(): void {
        this.fetchCounts();
    }

    fetchCounts(): void {
        this.service.getAdmin().subscribe(admin => {
            this.totalAdmins = admin.length;
            this.updateDoughnutChart();
        });

        this.service.getContacts().subscribe(contact => {
          this.totalContact = contact.length;
          this.updateDoughnutChart();
      });
        this.service.getClient().subscribe(client => {
            this.totalClients = client.length;
            this.updateDoughnutChart();
        });

        this.service.getTuteur().subscribe(tuteur => {
            this.totalTuteurs = tuteur.length;
            this.updateDoughnutChart();
        });

        this.service.getCours().subscribe(cours => {
            this.totalCours = cours.length;
            this.updateDoughnutChart();
        });

        this.service.getCategories().subscribe(categories => {
            this.totalCategorie = categories.length;
            this.updateDoughnutChart();
        });

        this.service.getSpecialites().subscribe(specialites => {
            this.totalSpecilaite = specialites.length;
            this.updateDoughnutChart();
        });

        this.service.getDomaines().subscribe(domaines => {
            this.totalExpertise = domaines.length;
            this.updateDoughnutChart();
        });
    }

    updateDoughnutChart(): void {
        const ctx = document.getElementById('categorieSpecialiteExpertiseChart') as HTMLCanvasElement;
        if (!this.doughnutChart && ctx) {
            this.doughnutChart = new Chart(ctx.getContext('2d')!, {
                type: 'doughnut' as ChartType,
                data: {
                    labels: ['Categorie', 'Specialite', 'Expertise'],
                    datasets: [{
                        data: [this.totalCategorie, this.totalSpecilaite, this.totalExpertise],
                        backgroundColor: ['#007bff', '#28a745', '#ffc107'],
                        hoverBackgroundColor: ['#0056b3', '#218838', '#e0a800']
                    }]
                },
                options: {
                    
                    plugins: {
                        legend: {
                            display: true,
                            position: 'bottom'
                        }
                    },
                    maintainAspectRatio: false
                }
            });
        } else if (this.doughnutChart) {
            this.doughnutChart.data.datasets[0].data = [this.totalCategorie, this.totalSpecilaite, this.totalExpertise];
            this.doughnutChart.update();
        }
    }
}
