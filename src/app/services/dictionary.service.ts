import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {
  // dictionary: any = {};

  constructor(public storage: Storage) { }

  init(): Promise<any> {
    console.log('init')
    let dictionary;

    this.storage.get('dictionary').then(res => {
      if (!res || res === {}) {
        dictionary = Promise.all([
          import('../providers/dictionary/dictionary.a'),
          import('../providers/dictionary/dictionary.b'),
          import('../providers/dictionary/dictionary.c'),
          import('../providers/dictionary/dictionary.d'),
          import('../providers/dictionary/dictionary.e'),
          import('../providers/dictionary/dictionary.f'),
          import('../providers/dictionary/dictionary.g'),
          import('../providers/dictionary/dictionary.h'),
          import('../providers/dictionary/dictionary.i'),
          import('../providers/dictionary/dictionary.j'),
          import('../providers/dictionary/dictionary.k'),
          import('../providers/dictionary/dictionary.l'),
          import('../providers/dictionary/dictionary.m'),
          import('../providers/dictionary/dictionary.n'),
          import('../providers/dictionary/dictionary.o'),
          import('../providers/dictionary/dictionary.p'),
          import('../providers/dictionary/dictionary.q'),
          import('../providers/dictionary/dictionary.r'),
          import('../providers/dictionary/dictionary.s'),
          import('../providers/dictionary/dictionary.t'),
          import('../providers/dictionary/dictionary.u'),
          import('../providers/dictionary/dictionary.v'),
          import('../providers/dictionary/dictionary.w'),
          import('../providers/dictionary/dictionary.x'),
          import('../providers/dictionary/dictionary.y'),
          import('../providers/dictionary/dictionary.z'),
        ])
          .then(([a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z]) => {
            this.storage.set('dictionary', {
              a: a.default,
              b: b.default,
              c: c.default,
              d: d.default,
              e: e.default,
              f: f.default,
              g: g.default,
              h: h.default,
              i: i.default,
              j: j.default,
              k: k.default,
              l: l.default,
              m: m.default,
              n: n.default,
              o: o.default,
              p: p.default,
              q: q.default,
              r: r.default,
              s: s.default,
              t: t.default,
              u: u.default,
              v: v.default,
              w: w.default,
              x: x.default,
              y: y.default,
              z: z.default,
            })
          });
      } else {
        dictionary = new Promise((resolve) => {
          resolve('done');
        }).then(res => { });
      }
    })


    return dictionary;
  }

}
