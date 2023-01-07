# Products API

### Table of Contents
1. [General Info](#general-info)
2. [Performance](#performance)
3. [Optimization](#optimization)
4. [Tech Stack](#tech)
5. [Team](#team)

<a name="general-info"></a>
### General Info

Implemented improved Products API to meet 1k request per second requirement.

Postgres

<a name="performance"></a>
### Perfomance

Back End Architecture utilizes AWS to deploy a load balancer with a cache, 3 servers, and a Postgres database. All load tests performed via Loader.io.

<details>
  <summary>Typical Load Performance</summary>

  #### Typical 1000 RPS Load

  Perfomance at typical load of 1000 clients per second. 4ms latency and 0% error

  ![1000 RPS Performance](assets/Products1kReg.png)

</details>



<a name="optimization"></a>
### Optimization

<details><summary>Cache Implementation</summary>

  #### Cache Performance

  Cache and load balancer implemented using Nginx - Latency has decreased by almost 50% to an average of 61ms and can handle up to 5000rps with a 0% error rate.

  ![5000 RPS Performance](assets/Products5kCache.png)

</details>

<a name="tech"></a>
### Tech Stack
![node](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![postgres](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Nginx](https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white) <br />


<a name="team"></a>
Product Detail: Thomas Saldana\
[![Linkedin: LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/thomassaldana/)
[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/SaldanaThomas)