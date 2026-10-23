import assert from 'node:assert/strict';
import test from 'node:test';
import { chartGeometry, dateTickIndices, nearestPointIndex } from '../src/lib/reproductionChartGeometry.mjs';

test('phone geometry fits the container without shrinking text or plot height', () => {
  const geometry = chartGeometry(314);
  assert.equal(geometry.width, 314);
  assert.ok(geometry.fontSize >= 11);
  assert.ok(geometry.navHeight >= 280);
  assert.ok(geometry.drawdownHeight >= 155);
  assert.ok(geometry.width - geometry.left - geometry.right >= 200);
});

test('resizing to desktop expands plot width while preserving label size', () => {
  const mobile = chartGeometry(314);
  const desktop = chartGeometry(1040);
  assert.equal(desktop.width, 1040);
  assert.equal(desktop.fontSize, mobile.fontSize);
  assert.ok(desktop.navHeight >= mobile.navHeight);
});

test('date ticks preserve both endpoints with fewer labels on a phone', () => {
  assert.deepEqual(dateTickIndices(101, 230), [0, 100]);
  assert.deepEqual(dateTickIndices(101, 600), [0, 25, 50, 75, 100]);
  assert.deepEqual(dateTickIndices(1, 230), [0]);
  assert.deepEqual(dateTickIndices(0, 230), []);
});

test('pointer selection maps to nearest sample and clamps outside the plot', () => {
  assert.equal(nearestPointIndex(54, 54, 284, 5), 0);
  assert.equal(nearestPointIndex(169, 54, 284, 5), 2);
  assert.equal(nearestPointIndex(225, 54, 284, 5), 3);
  assert.equal(nearestPointIndex(-20, 54, 284, 5), 0);
  assert.equal(nearestPointIndex(400, 54, 284, 5), 4);
  assert.equal(nearestPointIndex(200, 54, 284, 1), 0);
});
