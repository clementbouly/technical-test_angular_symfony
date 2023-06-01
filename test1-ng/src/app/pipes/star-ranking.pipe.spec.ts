import { StarRankingPipe } from './star-ranking.pipe';

describe('StarRankingPipe', () => {
  it('create an instance', () => {
    const pipe = new StarRankingPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return 10 stars', () => {
    const pipe = new StarRankingPipe();
    expect(pipe.transform(10)).toEqual('★★★★★★★★★★');
  });

  it('should return 5 stars', () => {
    const pipe = new StarRankingPipe();
    expect(pipe.transform(5)).toEqual('★★★★★☆☆☆☆☆');
  });

  it('should return 0 stars', () => {
    const pipe = new StarRankingPipe();
    expect(pipe.transform(0)).toEqual('☆☆☆☆☆☆☆☆☆☆');
  });

  
});
