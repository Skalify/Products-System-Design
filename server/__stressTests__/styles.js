import http from "k6/http";
import { check, sleep } from "k6";
import { Counter } from "k6/metrics";

let ErrorCount = new Counter("errors");

export const options = {
  scenarios: {
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      rate: 1000,
      timeUnit: '1s', // 1000 iterations per second, i.e. 1000 RPS
      duration: '15s',
      preAllocatedVUs: 20, // how large the initial pool of VUs would be
      maxVUs: 50, // if the preAllocatedVUs are not enough, we can initialize more
    },
  },
  thresholds: {
    http_req_failed: ['rate<0.01'], // http errors should be less than 1%
    http_req_duration: ['p(100)<2000'], //http response should be less than 2000ms
  },
};

export default function() {
  let res = http.get(`http://localhost:8080/products/1000000/styles`);
  let success = check(res, {
    "status is 200": r => r.status === 200
  });
  if (!success) {
    ErrorCount.add(1);
  }
  sleep(2);
}